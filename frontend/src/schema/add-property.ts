import { z } from "zod";

const Type = z.enum(["buy", "rent"]);
const Property = z.enum(["apartment", "house", "condo", "land"]);


const PostDetailsSchema = z.object({
  size: z.coerce.number().min(0),
  desc: z.string().min(0).max(500), 
  electricity: z.boolean().optional(),
  water: z.boolean().optional(),
  gas: z.boolean().optional(),
  parking: z.boolean().optional(),
  wifi: z.boolean().optional(),
  swimmingPool: z.boolean().optional(),
  fitnessCenter: z.boolean().optional(),
  clubhouse: z.boolean().optional(),
  playground: z.boolean().optional(),
  petFriendly: z.boolean().optional(), 
});

export const AddPropertySchema = z.object({
  title: z.string().min(1).max(100), 
  price: z.coerce.number().min(0),
  images: z.array(z.string()), 
  address: z.string().min(1).max(255), 
  city: z.string().min(1).max(100), 
  property: Property,
  type: Type,
  bedroom: z.coerce.number().min(0).max(10),
  bathroom: z.coerce.number().min(0).max(10),
  longitude: z.string(), 
  latitude: z.string(), 

  postDetails: PostDetailsSchema,
});


export type AddPropertyTypeSchema = z.infer<typeof AddPropertySchema>;
