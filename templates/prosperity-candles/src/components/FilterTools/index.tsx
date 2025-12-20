import { ListFilter, type LucideProps } from "lucide-react";
import type { ForwardRefExoticComponent, RefAttributes } from "react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Icon = ForwardRefExoticComponent<
	Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
>;

type Props = {
	title: string;
	subtitle?: string;
	filterParams: {
		value: string;
		label: string;
		icon: Icon;
	}[];
	defaultFilterParam:
		| {
				value: string;
				label: string;
				icon: Icon;
		  }
		| string;
	onChange: (e: any, checked?: boolean) => void;
};

export function SelectInput({
	title,
	subtitle,
	filterParams,
	onChange,
	defaultFilterParam,
}: Props) {
	const checkedValue: string =
		typeof defaultFilterParam === "object"
			? defaultFilterParam.value
			: defaultFilterParam;
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='outline' size='sm' className='h-8 gap-1'>
					<ListFilter className='size-3.5' />
					<span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>
						{title}
					</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end' className='bg-beige-color'>
				<DropdownMenuLabel>{subtitle}</DropdownMenuLabel>
				<DropdownMenuSeparator />
				{filterParams.map(filter => (
					<DropdownMenuCheckboxItem
						key={filter.value}
						checked={checkedValue ? checkedValue === filter.value : false}
						onCheckedChange={(checked: boolean) =>
							onChange(filter.value, checked)
						}
					>
						{filter.label}{" "}
						{filter.icon && (
							<filter.icon className='size-3.5 ml-1 text-muted-foreground/70' />
						)}
					</DropdownMenuCheckboxItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
// <DropdownMenu>
//   <DropdownMenuTrigger asChild>
//     <Button variant="outline" size="sm" className="h-8 gap-1">
//       <ListFilter className="size-3.5" />
//       <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Filter</span>
//     </Button>
//   </DropdownMenuTrigger>
//   <DropdownMenuContent align="end" className="bg-beige-color">
//     <DropdownMenuLabel>Filter by</DropdownMenuLabel>
//     <DropdownMenuSeparator />
//     <DropdownMenuCheckboxItem
//       checked={sortBy === '-createdAt'}
//       onCheckedChange={() => handleSort('-createdAt')}
//     >
//       Date <ArrowDown className="size-3.5 ml-1 text-muted-foreground/70" />
//     </DropdownMenuCheckboxItem>
//     <DropdownMenuCheckboxItem
//       checked={sortBy === 'createdAt'}
//       onCheckedChange={() => handleSort('createdAt')}
//     >
//       Date <ArrowUp className="size-3.5 ml-1 text-muted-foreground/70" />
//     </DropdownMenuCheckboxItem>

//     <DropdownMenuSeparator className="bg-dark-beige-color" />
//     <DropdownMenuCheckboxItem onCheckedChange={() => handleSort('all')}>
//       Clear
//     </DropdownMenuCheckboxItem>
//   </DropdownMenuContent>
// </DropdownMenu>

// <Select onValueChange={handleStatusChange}>
//   <SelectTrigger className="w-[180px] bg-beige-color">
//     <SelectValue placeholder="Select all" defaultValue={status || 'all'} />
//   </SelectTrigger>
//   <SelectContent className=" bg-beige-color">
//     {statuses.map((status) => (
//       <SelectItem key={status.label} value={status.value}>
//         {status.label}
//       </SelectItem>
//     ))}
//     <Separator className="bg-dark-beige-color" />
//     <SelectItem key={'all'} value={'all'}>
//       Select all
//     </SelectItem>
//   </SelectContent>
// </Select>
