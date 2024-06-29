import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// @ts-ignore
import CloudinaryUploadWidget from "../../components/upload-files/CloudinaryUploadWidget.jsx";
import apiRequest from "@/lib/apiService.js";
import { Input } from "@/components/ui/input.js";
import { Checkbox } from "@/components/ui/checkbox.js";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.js";
import {
  AddPropertySchema,
  AddPropertyTypeSchema,
} from "@/schema/add-property.js";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form.js";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { CheckIcon, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button.js";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "@/components/ui/use-toast.js";
import { IoWarning } from "react-icons/io5";

function UpdateProperty() {
  const { id } = useParams();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [description, setDescription] = useState<string>("");

  const navigate = useNavigate();

  const form = useForm<AddPropertyTypeSchema>({
    resolver: zodResolver(AddPropertySchema),
    defaultValues: {
      title: "",
      price: 0,
      images: [],
      address: "",
      city: "",
      property: undefined,
      type: undefined,
      bedroom: 0,
      bathroom: 0,
      longitude: "",
      latitude: "",
      postDetails: {
        size: 0,
        desc: "",
        electricity: false,
        water: false,
        gas: false,
        parking: false,
        wifi: false,
        swimmingPool: false,
        fitnessCenter: false,
        clubhouse: false,
        playground: false,
        petFriendly: false,
      },
    },
  });

  useEffect(() => {
    const fetchPropertyData = async () => {
      try {
        const response = await apiRequest.get(`/posts/${id}`);
        const propertyData = response.data;

        form.reset({
          ...propertyData,
          property: propertyData.property,
          type: propertyData.type,
          postDetails: {
            ...propertyData.postDetail,
          },
        });
        setImages(propertyData.images);
        setDescription(propertyData.postDetail.desc);
      } catch (err) {
        console.error("Error fetching property data:", err);
      }
    };

    fetchPropertyData();
  }, [form, id]);

  const onSubmit = async (data: AddPropertyTypeSchema) => {
    try {
      const postData = {
        ...data,
        images: images,
        postDetails: {
          ...data.postDetails,
          desc: description,
        },
      };

      setIsLoading(true);
      setError("");

      await apiRequest.patch(`/posts/${id}`, postData);

      form.reset();
      setImages([]);
      setDescription("");
      toast({
        action: (
          <div className="w-full flex items-center">
            <CheckIcon className="mr-2" color="green" />
            <span className="first-letter:capitalize">
              {postData.title} successfully updated
            </span>
          </div>
        ),
      });
      navigate(`/${id}`);
    } catch (err: any) {
      console.error("Error submitting:", err);
      setError(err.response?.data?.message || "An error occurred");
      toast({
        action: (
          <div className="w-full flex items-center">
            <IoWarning className="mr-2" color="red" />
            <span className="first-letter:capitalize">An error occured</span>
          </div>
        ),
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full m-auto border justify-center">
      <CardHeader className="w-full h-[120px] flex flex-col justify-center pl-24 bg-blue-500 text-white">
        <CardTitle>Update Property</CardTitle>
        <CardDescription className="text-white">
          Fill out the form below to update a property.
        </CardDescription>
      </CardHeader>

      <CardContent className="mt-4 max-w-[90rem] mx-auto">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Property Title</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Modern Family Home in Taguig"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Property Price</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} placeholder="Enter price" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex w-full gap-4">
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        {...field}
                        placeholder="Enter Address"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} placeholder="Enter City" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="property"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select a Property</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="capitalize">
                        <SelectTrigger>
                          <SelectValue placeholder={field.value}>
                            {field.value}
                          </SelectValue>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="house">House</SelectItem>
                        <SelectItem value="condo">Condo</SelectItem>
                        <SelectItem value="apartment">Apartment</SelectItem>
                        <SelectItem value="townhouse">Townhouse</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Select what type of property.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select a type of Property</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="capitalize">
                        <SelectTrigger>
                          <SelectValue placeholder={field.value}>
                            {field.value}
                          </SelectValue>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="rent">Rent</SelectItem>
                        <SelectItem value="buy">Buy</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Select what type of property.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex w-full gap-4">
              <FormField
                control={form.control}
                name="bathroom"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Bathroom</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bedroom"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Bedroom</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="postDetails.size"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Property Size</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} placeholder="Size (sqft)" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="longitude"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Longitude</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      {...field}
                      placeholder="Enter Longitude"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="latitude"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Latitude</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      {...field}
                      placeholder="Enter Latitude"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="postDetails.desc"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Property Description</FormLabel>
                  <FormControl>
                    <ReactQuill
                      theme="snow"
                      value={description}
                      onChange={setDescription}
                      placeholder="Enter property description"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <FormLabel>What does your Property Offer?</FormLabel>
              <FormDescription>
                What makes this property a good choice.
              </FormDescription>{" "}
              <div className="flex gap-3 flex-wrap">
                <FormField
                  control={form.control}
                  name="postDetails.electricity"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-end space-x-3">
                      <FormLabel>Electricity</FormLabel>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="postDetails.water"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-end space-x-3">
                      <FormLabel>Water</FormLabel>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="postDetails.gas"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-end space-x-3">
                      <FormLabel>Gas</FormLabel>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="postDetails.parking"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-end space-x-3">
                      <FormLabel>Parking</FormLabel>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="postDetails.wifi"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-end space-x-3">
                      <FormLabel>Wi-Fi</FormLabel>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="postDetails.swimmingPool"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-end space-x-3">
                      <FormLabel>Swimming Pool</FormLabel>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="postDetails.fitnessCenter"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-end space-x-3">
                      <FormLabel>Fitness Center</FormLabel>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="postDetails.clubhouse"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-end space-x-3">
                      <FormLabel>Clubhouse</FormLabel>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="postDetails.playground"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-end space-x-3">
                      <FormLabel>Playground</FormLabel>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="postDetails.petFriendly"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-end space-x-3">
                      <FormLabel>Pet Friendly</FormLabel>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {error && <p className="text-red-500">{error}</p>}

            <Button type="submit" className="ml-auto mt-10">
              {isLoading && <Loader2 className="animate-spin" />}
              {isLoading ? "Updating" : "Update Property"}
            </Button>
          </form>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-2">
            {images.map((image, index) => (
              <img
                src={image}
                key={index}
                alt={`Property image ${index + 1}`}
                className="object-cover h-40 w-full"
              />
            ))}
            <CloudinaryUploadWidget
              uwConfig={{
                cloudName: "christian30",
                uploadPreset: "InstaStay",
                multiple: true,
                folder: "posts",
              }}
              setState={setImages}
            />
          </div>
        </Form>
      </CardContent>
    </Card>
  );
}

export default UpdateProperty;
