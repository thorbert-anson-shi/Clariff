import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function InteractionCard() {
  return (
    <div className="fixed right-1 bottom-1">
      <Card>
        <CardHeader>
          <CardTitle>Clarify</CardTitle>
          <CardDescription>
            Highlight text from the current website to rephrase
          </CardDescription>
        </CardHeader>
        <CardContent>Hello there, this is a card</CardContent>
      </Card>
    </div>
  );
}
