import Image from "next/image";

import ImageSpiderMan616 from "@public/spiders/spider-man-616.png";
import ImageSpiderMan1610 from "@public/spiders/spider-man-1610.png";
import ImageSpiderWoman65 from "@public/spiders/mulher-aranha-65.png";
import ImageSpDr14512 from "@public/spiders/sp-dr-14512.png";
import ImageSpiderHam8311 from "@public/spiders/spider-ham-8311.png";
import ImageSpiderMan928 from "@public/spiders/spider-man-928.png";
import ImageSpiderMan90214 from "@public/spiders/spider-man-90214.png";

const heroes = [
  {
    id: "spider-man-616",
    src: ImageSpiderMan616,
    alt: "Homem-Aranha (Terra-616)",
  },
  {
    id: "mulher-aranha-65",
    src: ImageSpiderWoman65,
    alt: "Mulher-Aranha (Terra-65)",
  },
  {
    id: "spider-man-1610",
    src: ImageSpiderMan1610,
    alt: "Homem-Aranha (Terra-1610)",
  },
  {
    id: "sp-dr-14512",
    src: ImageSpDr14512,
    alt: "Homem-Aranha (Terra-14512)",
  },
  {
    id: "porco-aranha-8311",
    src: ImageSpiderHam8311,
    alt: "Porco-Aranha (Terra-8311)",
  },
  {
    id: "spider-man-90214",
    src: ImageSpiderMan90214,
    alt: "Homem-Aranha (Terra-90214)",
  },
  {
    id: "spider-man-928",
    src: ImageSpiderMan928,
    alt: "Homem-Aranha (Terra-928)",
  },
];

interface IProps {
  heroId: string;
}

export default function Hero({ heroId }: IProps) {
  return (
    <Image
      src={heroes.find((item) => item.id === heroId)?.src || ImageSpiderMan616}
      alt={heroes.find((item) => item.id === heroId)?.alt || ""}
      priority
    />
  );
}
