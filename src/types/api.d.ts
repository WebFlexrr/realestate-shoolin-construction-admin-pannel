interface Enquiry {
	id: string;
	name: string;
	phone: number;
	email: string;
	message: string;
	createdAt: string;
	updatedAt: string;
}

interface Project {
	_id: string;
	name: string;
	slug: string;
	price: string;
	propertyType: string;
	status: string;
	brochure: File;
	apartmentType: string[];
	totalUnits: string;
	possessionDate: Date;
	totalFloors: string;
	description: string;
	amenities: string[];
	masterPlan: File;
	unitPlan?: Array<{
		_id: string;
		flatName: string;
		floorNo: string;
		image?: File;
		coveredArea: string;
		stairArea: string;
		builtUpArea: string;
		serviceArea: string;
		totalArea: string;
		sold: boolean;
		price: string;
	}>;
	constructionStatus?: Array<{
		time: Date;
		image: string;
	}>;
	map: string;
	address: string;
	thumbnail: File;
	coverImages: File[];
	isPublished: boolean;
	createdAt: string;
	updatedAt: string;
	__v?: number;
}
