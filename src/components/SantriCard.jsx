import { Link } from 'react-router';
import { ArrowRight, UserRound } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function SantriCard({ id, name, classroom }) {
  return (
    <Link to={`/admin/santri/${id}`} className="block">
      <Card className="group cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md">
        <CardContent className="flex items-center justify-between p-4">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted">
              <UserRound className="h-5 w-5 text-muted-foreground" />
            </div>

            <div>
              <h2 className="text-sm font-semibold">
                {name}
              </h2>

              <Badge variant="secondary" className="mt-1 text-[10px]">
                Kelas {classroom}
              </Badge>
            </div>

          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground transition-colors group-hover:text-foreground">
            <span className="hidden sm:block">
              Detail
            </span>

            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>

        </CardContent>
      </Card>
    </Link>
  );
}