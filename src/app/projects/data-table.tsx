'use client';
import {
	type ColumnDef,
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	useReactTable,
} from '@tanstack/react-table';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import React, { type Dispatch, type SetStateAction } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { handleDelete } from './columns';

interface DataTableProps<TData extends ProjectResponse, TValue> {
	columns: Array<ColumnDef<TData, TValue>>;
	data: TData[];
	setCreate: Dispatch<SetStateAction<boolean>>;
}

export function DataTable<TData extends ProjectResponse, TValue>({
	columns,
	data,
	setCreate,
}: DataTableProps<TData, TValue>) {
	const [rowSelection, setRowSelection] = React.useState({});
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onRowSelectionChange: setRowSelection,
		state: {
			rowSelection,
		},
	});

	return (
		<div className="flex w-full flex-col gap-2 ">
			<div className="flex w-full items-center gap-5  py-4">
				<Button
					onClick={() => {
						setCreate(true);
					}}
				>
					Create <Plus />
				</Button>

				<div
					className={`flex-1 text-sm text-muted-foreground ${table.getFilteredSelectedRowModel().rows.length ? 'visible' : 'invisible'}`}
				>
					{table.getFilteredSelectedRowModel().rows.length} of{' '}
					{table.getFilteredRowModel().rows.length} row(s) selected.
				</div>
				<div className="flex items-center justify-end space-x-2 ">
					<Button
						variant={'default'}
						onClick={() =>
							// eslint-disable-next-line no-void
							void handleDelete(
								// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
								table
									.getFilteredSelectedRowModel()
									.rows.map((item) => item.original._id)
							)
						}
						disabled={!table.getFilteredSelectedRowModel().rows.length}
					>
						Delete
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={() => {
							table.previousPage();
						}}
						disabled={!table.getCanPreviousPage()}
					>
						Previous
					</Button>

					{table.getPageOptions()}
					{table.getPageCount()}
					<Button
						variant="outline"
						size="sm"
						onClick={() => {
							table.nextPage();
						}}
						disabled={!table.getCanNextPage()}
					>
						Next
					</Button>
				</div>
			</div>

			<div className="  rounded-md  border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
														header.column.columnDef.header,
														header.getContext()
													)}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && 'selected'}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id} className="truncate text-base">
											{flexRender(
												// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
