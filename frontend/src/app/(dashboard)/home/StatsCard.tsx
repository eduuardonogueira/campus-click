import cn from "classnames";

interface IStatsCardProps {
  value: number;
  text: string;
  color: string;
}

export default async function StatsCard({
  value,
  text,
  color,
}: IStatsCardProps) {
  return (
    <hgroup
      className={cn(
        "flex flex-col gap-2 items-center justify-center rounded-md w-[300px] h-[120px] p-4",
        color
      )}
    >
      <h4 className="text-2xl font-bold">{value}</h4>
      <h5>{text}</h5>
    </hgroup>
  );
}

