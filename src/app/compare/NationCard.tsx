import { BarChart, Building2, Globe2, Scale, Users } from "lucide-react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Nation } from "~/server/actions/nations";

export function NationCard({ nation }: { nation: Nation }) {
  return (
    <Card key={nation.id} className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{nation.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <section>
          <h3 className="mb-2 text-lg font-semibold">Overview</h3>
          <ScrollArea className="h-[200px] w-full rounded-md border p-4">
            {nation.description
              ?.split("\n")
              .map((desc, i) => (
                <p className="text-sm text-gray-600">{desc}</p>
              ))}
          </ScrollArea>
        </section>

        <section>
          <h3 className="mb-2 text-lg font-semibold">Government</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Building2 className="h-5 w-5 text-gray-500" />
              <span className="font-semibold">Government Form:</span>
              <span>
                {nation.governmentForms.map((form) => form.governmentForm.name)}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-gray-500" />
              <span className="font-semibold">Head of State:</span>
              <span>{nation?.headOfStates?.name}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-gray-500" />
              <span className="font-semibold">Head of Government:</span>
              <span>{nation?.headOfGovernments?.name}</span>
            </div>
          </div>
        </section>

        <section>
          <h3 className="mb-2 text-lg font-semibold">Political Parties</h3>
          <ScrollArea className="h-[200px] w-full rounded-md border p-4">
            <div className="space-y-4">
              {nation.parties.map((party) => (
                <div key={party.id} className="flex items-center space-x-2">
                  {party.logoUrl && (
                    <img
                      src={party.logoUrl}
                      alt={`${party.name} logo`}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  )}
                  <span>{party.name}</span>
                </div>
              ))}
            </div>
          </ScrollArea>
        </section>

        <section>
          <h3 className="mb-2 text-lg font-semibold">Indices</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Globe2 className="h-5 w-5 text-gray-500" />
              <span className="font-semibold">Democracy Index:</span>
              <span>{nation.democracyIndex}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Scale className="h-5 w-5 text-gray-500" />
              <span className="font-semibold">Rule of Law Index:</span>
              <span>{nation.RuleOfLawIndex}</span>
            </div>
            <div className="flex items-center space-x-2">
              <BarChart className="h-5 w-5 text-gray-500" />
              <span className="font-semibold">Corruption Index:</span>
              <span>{nation.corruptionIndex}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-gray-500" />
              <span className="font-semibold">Human Development Index:</span>
              <span>{nation.humanDevelopmentIndex}</span>
            </div>
          </div>
        </section>
      </CardContent>
    </Card>
  );
}
