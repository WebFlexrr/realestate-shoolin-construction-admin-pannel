interface Enquiry {
	id: string;
	name: string;
	phone: number;
	email: string;
	message: string;
	createdAt: string;
	updatedAt: string;
}

interface CreateProject {
	name: string;
	price: string;
	propertyType: string;
	status: string;
	brochure?: string;
	apartmentType: string[];
	totalUnits: string;
	possessionDate: Date;
	totalFloors: string;
	description: string;
	amenities: string[];
	masterPlan?: string;
	unitPlan: Array<{
		flatName: string;
		floorNo: string;
		image?: string | File;
		coveredArea?: string;
		stairArea?: string;
		builtUpArea?: string;
		serviceArea?: string;
		totalArea?: string;
		sold?: boolean;
		price: string;
	}>;
	constructionStatus?: Array<{
		time: Date;
		image: string;
	}>;
	map: string;
	address: string;
	thumbnail?: string;
	coverImages?: Array<string | undefined>;
	isPublished: boolean;
}
interface ProjectResponse extends CreateProject {
	_id: string;
	slug: string;
	name?: string;
	price?: string;
	propertyType: string;
	status: string;
	brochure?: File;
	masterPlan?: File;
	unitPlan: Array<{
		flatName: string;
		floorNo: string;
		image?: File;
		coveredArea?: string;
		stairArea?: string;
		builtUpArea?: string;
		serviceArea?: string;
		totalArea?: string;
		sold?: boolean;
		price: string;
	}>;
	thumbnail?: File;
	coverImages?: Array<File | undefined>;
	createdAt: string;
	updatedAt: string;
	__v: number;
}
