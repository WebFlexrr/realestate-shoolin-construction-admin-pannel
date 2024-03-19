interface Enquiry {
	id: string;
	name: string;
	phone: number;
	email: string;
	message: string;
}

interface Project {
	_id: string;
	name: string;
	price: string;
	tags: string[];
	brochure: string;
	apartmentType: string;
	totalUnits: string;
	possessionDate: Date;
	totalFloors: string;
	description: string;
	amenities: string[];
	masterPlan: string;
	unitPlan: Array<{
		_id: string;
		floorNo: number;
		flatType: Array<{
			_id: string;
			flatName: string;
			image: string;
			coveredArea: string;
			stairArea: string;
			builtUpArea: string;
			serviceArea: string;
			totalArea: string;
			price: string;
		}>;
	}>;
	constructionStatus: string[];
	map: string;
	address: string;
	thumbnail: string;
	coverImages: string[];
	isPublished: boolean;
	createdAt: string;
	updatedAt: string;
	__v: number;
}
