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

interface DataTableProps<TData extends Project, TValue> {
	columns: Array<ColumnDef<TData, TValue>>;
	data: TData[];
	setCreate: Dispatch<SetStateAction<boolean>>;
	// setIsEditableProjectData: Dispatch<SetStateAction<Project | undefined>>;
	// setIsEditOpen: Dispatch<SetStateAction<boolean>>;
}

export function DataTable<TData extends Project, TValue>({
	columns,
	data,
	setCreate,
	// setIsEditableProjectData,
	// setIsEditOpen,
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
						variant="outline"
						size="sm"
						onClick={() => {
							table.previousPage();
						}}
						disabled={!table.getCanPreviousPage()}
					>
						Previous
					</Button>

					{/* {table.getPageOptions()} */}
					{/* {table.getPageCount()} */}
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
									{row.getVisibleCells().map((cell) => {
										// console.log(
										// 	'Cell'
										// 	// cell.id === '0_edit' ? '0_edit true' : 'false'
										// 	// cell.column.columnDef.cell
										// 	// cell.getContext().row.original
										// );
										// return cell.id === '0_edit' ? (
										// 	<TableCell key={cell.id} className="truncate text-base">
										// 		<button
										// 			onClick={() => {
										// 				// console.log(
										// 				// 	'get Project Datas',
										// 				// 	cell.getContext().row.original
										// 				// );
										// 			}}
										// 		>
										// 			{flexRender(
										// 				cell.column.columnDef.cell,
										// 				cell.getContext()
										// 			)}
										// 		</button>
										// 	</TableCell>
										// ) : (
										return (
											<TableCell key={cell.id} className="truncate text-base">
												{flexRender(
													cell.column.columnDef.cell,
													cell.getContext()
												)}
											</TableCell>
										);
										// );
									})}
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
