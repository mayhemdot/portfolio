export function CopyrightNotice({ siteName }: { siteName: string }) {
  return (
    <p className="flex justify-between fsSmall">
      © {new Date().getFullYear()} {siteName}. All rights reserved.
    </p>
  );
}
