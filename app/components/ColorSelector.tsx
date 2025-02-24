'use client';
import { Colors, ColorKey } from '@/constants/colors';
import Link from 'next/link';

interface ColorSelectorProps {
  currentColor?: ColorKey;
  onColorSelect: (color: ColorKey) => void;
  defaultColor?: ColorKey;
}

export default function ColorSelector({
  currentColor,
  onColorSelect,
}: ColorSelectorProps) {
  return (
    <div className="flex items-center gap-2 p-2">
      {Object.entries(Colors).map(([key, value]) => (
        <Link
          key={key}
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onColorSelect(key as ColorKey);
          }}
          className={`
            w-8 h-8 
            rounded-full 
            transition-all 
            hover:scale-110 
            ${currentColor === key ? 'ring-2 ring-offset-2 ring-gray-900' : ''}
          `}
          style={{ backgroundColor: value }}
          aria-label={`Select ${key} color`}
        />
      ))}
    </div>
  );
}
