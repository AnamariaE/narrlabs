#!/usr/bin/env python3
"""Clona de forma más completa un sitio con Selenium + requests.

- Recorre enlaces internos (mismo dominio).
- Descubre URLs también desde sitemap.xml (si existe).
- Descarga assets (css/js/img/fonts/pdf/etc.) referenciados en HTML.
- Guarda HTML y assets respetando estructura de rutas.

Uso:
    python tools/selenium_full_clone.py --base-url https://narrlabs.com --out ~/Desktop/narrlabs_clon
"""

from __future__ import annotations

import argparse
import os
import re
import time
from collections import deque
from pathlib import Path
from urllib.parse import parse_qsl, urlencode, urljoin, urlparse, urlunparse

import requests
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager

IGNORED_SCHEMES = ("mailto:", "tel:", "javascript:", "data:")
ASSET_EXTENSIONS = {
    ".css",
    ".js",
    ".mjs",
    ".png",
    ".jpg",
    ".jpeg",
    ".webp",
    ".gif",
    ".svg",
    ".ico",
    ".woff",
    ".woff2",
    ".ttf",
    ".eot",
    ".otf",
    ".pdf",
    ".mp4",
    ".webm",
    ".json",
    ".xml",
}


def normalize_url(url: str) -> str:
    """Normaliza URL para deduplicar sin perder query útil."""
    p = urlparse(url)
    scheme = p.scheme.lower() or "https"
    netloc = p.netloc.lower()
    path = p.path or "/"
    # quitar slash final salvo raíz
    if path != "/":
        path = path.rstrip("/")
    # orden estable de query params
    query = urlencode(sorted(parse_qsl(p.query, keep_blank_values=True)))
    return urlunparse((scheme, netloc, path, "", query, ""))


def same_domain(url: str, base_domain: str) -> bool:
    host = urlparse(url).netloc.lower()
    return host == base_domain or host == f"www.{base_domain}" or host == ""


def clean_candidate(href: str, current_url: str) -> str | None:
    if not href:
        return None
    href = href.strip()
    if not href or href.startswith(IGNORED_SCHEMES):
        return None
    absolute = urljoin(current_url, href)
    normalized = normalize_url(absolute)
    return normalized


def is_asset(url: str) -> bool:
    path = urlparse(url).path.lower()
    _, ext = os.path.splitext(path)
    return ext in ASSET_EXTENSIONS


def local_path_for(url: str, out_dir: Path, is_html: bool) -> Path:
    p = urlparse(url)
    path = p.path or "/"

    if is_html:
        # /about -> /about/index.html
        if path.endswith("/") or path == "":
            path = f"{path}index.html"
        elif os.path.splitext(path)[1] == "":
            path = f"{path}/index.html"
        elif not path.endswith(".html"):
            path = f"{path}.html"
    else:
        if path.endswith("/") or path == "":
            path = f"{path}index.bin"

    # evitar colisiones por query
    if p.query:
        safe_q = re.sub(r"[^a-zA-Z0-9_-]", "_", p.query)
        stem, ext = os.path.splitext(path)
        path = f"{stem}__q_{safe_q}{ext}"

    safe_path = path.lstrip("/")
    return out_dir / safe_path


def read_sitemap_urls(base_url: str, timeout: int = 20) -> list[str]:
    sitemap_url = urljoin(base_url, "/sitemap.xml")
    try:
        r = requests.get(sitemap_url, timeout=timeout)
        r.raise_for_status()
    except Exception:
        return []

    # parseo simple sin dependencia XML pesada
    urls = re.findall(r"<loc>(.*?)</loc>", r.text, flags=re.IGNORECASE)
    return [normalize_url(u.strip()) for u in urls if u.strip()]


def extract_candidate_urls(page_html: str, current_url: str) -> tuple[set[str], set[str]]:
    soup = BeautifulSoup(page_html, "html.parser")

    page_candidates: set[str] = set()
    asset_candidates: set[str] = set()

    # href/src más comunes
    selectors = [
        ("a", "href", "page"),
        ("link", "href", "asset"),
        ("script", "src", "asset"),
        ("img", "src", "asset"),
        ("source", "src", "asset"),
        ("video", "src", "asset"),
        ("audio", "src", "asset"),
        ("iframe", "src", "page"),
    ]

    for tag, attr, kind in selectors:
        for node in soup.find_all(tag):
            raw = node.get(attr)
            url = clean_candidate(raw, current_url)
            if not url:
                continue
            if kind == "asset" or is_asset(url):
                asset_candidates.add(url)
            else:
                page_candidates.add(url)

    # srcset
    for node in soup.find_all(attrs={"srcset": True}):
        srcset = node.get("srcset", "")
        for part in srcset.split(","):
            raw = part.strip().split(" ")[0]
            url = clean_candidate(raw, current_url)
            if url:
                asset_candidates.add(url)

    return page_candidates, asset_candidates


def download_asset(url: str, out_dir: Path, session: requests.Session) -> None:
    target = local_path_for(url, out_dir, is_html=False)
    if target.exists():
        return
    target.parent.mkdir(parents=True, exist_ok=True)
    try:
        r = session.get(url, timeout=30)
        r.raise_for_status()
        target.write_bytes(r.content)
        print(f"   📦 Asset: {url} -> {target}")
    except Exception as e:
        print(f"   ⚠️ No se pudo descargar asset {url}: {e}")


def clone_site(base_url: str, out_dir: Path, wait_seconds: float, max_pages: int | None) -> None:
    base_norm = normalize_url(base_url)
    base_domain = urlparse(base_norm).netloc.replace("www.", "")

    out_dir.mkdir(parents=True, exist_ok=True)

    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
    session = requests.Session()

    visited_pages: set[str] = set()
    downloaded_assets: set[str] = set()
    queue: deque[str] = deque([base_norm])

    # Seed con sitemap para cobertura más completa
    for sm_url in read_sitemap_urls(base_norm):
        if same_domain(sm_url, base_domain):
            queue.append(sm_url)

    try:
        while queue:
            if max_pages is not None and len(visited_pages) >= max_pages:
                print(f"🛑 Límite alcanzado ({max_pages} páginas).")
                break

            current = queue.popleft()
            if current in visited_pages:
                continue
            if not same_domain(current, base_domain):
                continue

            print(f"🚀 Procesando página: {current}")
            try:
                driver.get(current)
                time.sleep(wait_seconds)
                html = driver.page_source
            except Exception as e:
                print(f"❌ Error cargando {current}: {e}")
                continue

            target_html = local_path_for(current, out_dir, is_html=True)
            target_html.parent.mkdir(parents=True, exist_ok=True)
            target_html.write_text(html, encoding="utf-8")
            visited_pages.add(current)

            page_urls, asset_urls = extract_candidate_urls(html, current)

            # fallback: también de Selenium por si hay shadow/interacciones parciales
            try:
                anchors = driver.find_elements(By.TAG_NAME, "a")
                for a in anchors:
                    href = clean_candidate(a.get_attribute("href"), current)
                    if href:
                        page_urls.add(href)
            except Exception:
                pass

            new_pages = 0
            for p in page_urls:
                if same_domain(p, base_domain) and p not in visited_pages and p not in queue:
                    queue.append(p)
                    new_pages += 1

            new_assets = 0
            for a in asset_urls:
                if not same_domain(a, base_domain):
                    continue
                if a in downloaded_assets:
                    continue
                download_asset(a, out_dir, session)
                downloaded_assets.add(a)
                new_assets += 1

            print(
                f"✅ Guardado HTML -> {target_html} | páginas nuevas: {new_pages} | assets nuevos: {new_assets} | pendientes: {len(queue)}"
            )

        print(
            f"\n🎉 Terminado. Páginas: {len(visited_pages)} | Assets: {len(downloaded_assets)} | Carpeta: {out_dir}"
        )
    finally:
        driver.quit()


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Clonador completo básico de sitios same-domain")
    parser.add_argument("--base-url", default="https://narrlabs.com", help="URL inicial")
    parser.add_argument(
        "--out",
        default=str(Path.home() / "Desktop" / "narrlabs_clon"),
        help="Carpeta destino",
    )
    parser.add_argument("--wait", type=float, default=2.5, help="Espera tras driver.get")
    parser.add_argument(
        "--max-pages",
        type=int,
        default=None,
        help="Límite de páginas para pruebas (omite para sin límite)",
    )
    return parser.parse_args()


if __name__ == "__main__":
    args = parse_args()
    clone_site(args.base_url, Path(args.out).expanduser(), args.wait, args.max_pages)
