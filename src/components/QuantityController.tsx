import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface QuantityControllerProps {
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export function QuantityController({
  value,
  onIncrement,
  onDecrement,
  onChange,
  min = 1,
  max = 99,
}: QuantityControllerProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    if (!isNaN(newValue)) {
      onChange(Math.min(Math.max(newValue, min), max));
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={onDecrement}
        disabled={value <= min}
      >
        -
      </Button>
      <Input
        type="number"
        className="w-16 text-center"
        value={value}
        onChange={handleInputChange}
        min={min}
        max={max}
      />
      <Button
        variant="outline"
        size="sm"
        onClick={onIncrement}
        disabled={value >= max}
      >
        +
      </Button>
    </div>
  );
}
