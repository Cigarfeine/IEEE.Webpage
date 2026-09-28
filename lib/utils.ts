import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getAssetPath(path: string): string {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("data:")) {
    return path;
  }
  let cleanPath = path.startsWith("/") ? path : `/${path}`;
  if (basePath) {
    const norm = basePath.startsWith("/") ? basePath : `/${basePath}`;
    const cleanNorm = norm.replace(/^\/+/, "").replace(/\/+$/, "");
    const regex = new RegExp(`^(/+${cleanNorm})+`, "g");
    cleanPath = cleanPath.replace(regex, norm);
    if (cleanPath === norm || cleanPath.startsWith(`${norm}/`)) {
      return cleanPath;
    }
    return `${norm}${cleanPath}`;
  }
  return cleanPath;
}

