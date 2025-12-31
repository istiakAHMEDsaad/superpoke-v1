import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

type SortOption = {
  label: string;
  value: string;
};

type FilterBarProps = {
  placeholder: string;
  sortOptions: SortOption[];
};

const FilterBar = ({ placeholder, sortOptions }: FilterBarProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center">
      {/* Search */}
      <Input placeholder={placeholder} className="sm:max-w-sm" />

      {/* Sort */}
      <Select>
        <SelectTrigger className="sm:w-52">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          {sortOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default FilterBar;
