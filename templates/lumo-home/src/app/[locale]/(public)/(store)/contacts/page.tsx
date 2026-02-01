import type { Metadata } from "next";
import React from "react";
import { DynamicBreadcrumb } from "@/shared/components/Breadcrumbs";
import { Badge } from "@/shared/components/ui/badge";
import { Shell } from "@/shared/components/ui/shell";
import { constructMetadata } from "@/shared/utils/meta";

export const metadata: Metadata = constructMetadata({
  title: "Контакты",
  url: "/contacts",
  description: "Контактная информация",
});

export default async function Page() {
  return (
    <div className="container mx-auto">
      <DynamicBreadcrumb
        breadcrumbs={[
          { label: "Главная", url: "/" },
          { label: "Контакты", url: "/contacts" },
        ]}
      />

      <h1 className="fl-text-32/64 text-center font-bold mx-auto mb-4">
        Contacts
      </h1>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
        <ContactCard
          key={"1"}
          className="col-span-2"
          title={"Contact center"}
          cards={[
            {
              label: "Address",
              value: "Daily from 9:00 AM to 10:00 PM (London time)",
            },
            { label: "Phone", value: "+44 7XXX XXXXXX" },
            { label: "Email", value: "store@gmail.ru" },
          ]}
        />
        <ContactCard
          key={"2"}
          className={"md:col-span-1 col-span-2"}
          title={"Store LUMO #1"}
          cards={[
            {
              label: "Address",
              value: "125 Baker Street, London W1U 6RT, UK",
            },
            { label: "Phone", value: "+44 7XXX XXXXXX" },
            { label: "Email", value: "store@gmail.ru" },
          ]}
        />
        <ContactCard
          key={"3"}
          className={"md:col-span-1 col-span-2"}
          title={"Store LUMO #2"}
          cards={[
            {
              label: "Address",
              value: "48 Kensington High Street, London W8 4PF, UK",
            },
            { label: "Phone", value: "+44 7XXX XXXXXX" },
            { label: "Email", value: "store@gmail.ru" },
          ]}
        />
      </div>
      {/* <Map />
      <ContactInfo /> */}
    </div>
  );
}

function ContactCard({
  className,
  title,
  cards,
}: {
  className?: string;
  title: string;
  cards: { label: string; value: string }[];
}) {
  return (
    <Shell className={className}>
      <h2 className="fl-text-24/32 leading-none font-medium text-center">
        {title}
      </h2>
      <div className="flex flex-col gap-2 items-start">
        {cards.map((card) => (
          <div
            key={card.label}
            className="flex w-full justify-between grow items-center gap-3"
          >
            <Badge size={"xs"}>{card.label}</Badge>
            <span className="fl-text-16/20">{card.value}</span>
          </div>
        ))}
      </div>
    </Shell>
  );
}
