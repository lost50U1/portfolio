import React from "react";

export default async function Project({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="py-4">
      <section className="pt-16">page with id {id}</section>
    </div>
  );
}
