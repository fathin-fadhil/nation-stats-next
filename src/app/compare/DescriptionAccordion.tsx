import { title } from "process";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Nation } from "~/server/actions/nations";

export function DescriptionAccordion({
  nationsData,
}: {
  nationsData: Nation[];
}) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {nationsData.map((nation, index) => (
        <AccordionItem key={nation.name + "descaccr"} value={nation.name}>
          <AccordionTrigger>{nation.name}</AccordionTrigger>
          <AccordionContent className="text-justify">
            {nation.description
              ?.split("\n")
              .map((para, i) => <p key={i + title + "desc"}>{para}</p>)}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
