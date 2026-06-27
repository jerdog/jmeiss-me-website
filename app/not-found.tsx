import Link from "next/link";
import { BPaper } from "@/components/surfaces/BPaper";
import { Container } from "@/components/layout/Container";
import { Tape } from "@/components/surfaces/Tape";

export default function NotFound() {
  return (
    <BPaper>
      <Container className="page-pad-not-found">
        <Tape rotation={-3} color="warm" textColor="paper">
          404
        </Tape>
        <h1 className="page-title-not-found">this page doesn&apos;t exist (yet?).</h1>
        <p className="page-lede">
          The link you followed might be old, or the page may have moved during the migration
          from Hugo. Try the{" "}
          <Link href="/posts" className="text-link">
            writing index
          </Link>{" "}
          or head{" "}
          <Link href="/" className="text-link">
            home
          </Link>
          .
        </p>
      </Container>
    </BPaper>
  );
}
