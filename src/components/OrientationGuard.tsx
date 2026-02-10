"use client";

export default function OrientationGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  // Allow both portrait and landscape modes
  return <>{children}</>;
}
