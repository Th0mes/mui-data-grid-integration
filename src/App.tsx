import { useEffect, useState } from 'react';

import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { type Product, getProducts } from './services/getProducts';
import { Box, Link, Typography } from '@mui/material';

const columns: GridColDef[] = [
	{ field: 'id', headerName: 'ID', flex: 1 },
	{
		field: 'title',
		headerName: 'Title',
		editable: true,
		flex: 2,
	},
	{
		field: 'description',
		headerName: 'Description',
		editable: true,
		sortable: false,
		flex: 3,
	},
	{
		field: 'price',
		headerName: 'Price',
		editable: true,
		flex: 1,
	},
	{
		field: 'discountPercentage',
		headerName: 'Discount Percentage',
		editable: true,
		flex: 1,
		renderCell: ({ value }) => <>{value}%</>,
	},
	{
		field: 'rating',
		headerName: 'Rating',
		editable: true,
		flex: 1,
	},
	{
		field: 'stock',
		headerName: 'Stock',
		editable: true,
		flex: 1,
	},
];

function App() {
	const [products, setProducts] = useState<Product[]>([]);
	const [paginationModel, setPaginationModel] = useState<{
		page: number;
		pageSize: number;
	}>({
		page: 0,
		pageSize: 10,
	});
	const [total, setTotal] = useState<number>(0);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(() => {
		setIsLoading(true);
		getProducts().then((res) => {
			setTotal(res.total);
			setProducts(res.products);
			setIsLoading(false);
		});
	}, []);

	useEffect(() => {
		setIsLoading(true);
		getProducts(paginationModel.page * 10).then((res) => {
			setTotal(res.total);
			setProducts(res.products);
			setIsLoading(false);
		});
	}, [paginationModel]);

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				maxWidth: '1280px',
				marginX: 'auto',
			}}
		>
			<Typography variant="h2" align="center" paddingY="2rem">
				MUI Data Grid - Pagination
			</Typography>
			<Box sx={{ maxWidth: '1280px' }}>
				<DataGrid
					columns={columns}
					rows={products}
					paginationModel={paginationModel}
					paginationMode="server"
					loading={isLoading}
					onPaginationModelChange={(res) => setPaginationModel(res)}
					rowCount={total}
					pageSizeOptions={[10]}
				/>
			</Box>
			<Box
				component="footer"
				sx={{
					maxWidth: '1280px',
					display: 'flex',
					alignItems: 'center',
					paddingY: '1rem',
					justifyContent: 'space-between',
				}}
			>
				<Typography variant="body1">
					Enjoy this example made by{' '}
					<Link
						href="https://github.com/Th0mes"
						target="_blank"
						rel="noopener noreferrer"
					>
						@Thomes
					</Link>
				</Typography>
				<Link href="#" target="_blank" rel="noopener noreferrer">
					Repo
				</Link>
			</Box>
		</Box>
	);
}

export default App;
