import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import "react-quill/dist/quill.snow.css";
// @ts-ignore
import CloudinaryUploadWidget from "../../components/upload-files/CloudinaryUploadWidget.jsx";
import apiRequest from "@/lib/apiService.js";
import { Input } from "@/components/ui/input.js";
import { Checkbox } from "@/components/ui/checkbox.js";
import { Label } from "@/components/ui/label.js";
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

import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button.js";
import { toast } from "@/components/ui/use-toast.js";

function AddProperty() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [description, setDescription] = useState<string>("");


  const form = useForm<AddPropertyTypeSchema>({
    resolver: zodResolver(AddPropertySchema),
    defaultValues: {
      title: "",
      price: 0,
      images: images,
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
      const res = await apiRequest.post("/posts", postData);
      setIsLoading(true);
      setError("");
      toast({
        title: "Success! 🎉",
        description: `${postData.title} is successfully added`,
      })
    } catch (err: any) {
      console.error("Error submitting:", err);
      setError(err.response?.data?.message || "An error occurred");
      toast({
        title: "Failed!",
        description: "An Error Occured",
      })
    }
  };

  return (
    <Card className="w-full m-auto border justify-center">
      <CardHeader className="w-full h-[120px] flex flex-col justify-center pl-24 bg-blue-500 text-white">
        <CardTitle>Add a Property</CardTitle>
        <CardDescription className="text-white">
          Fill out the form below to add a new property to your listing.
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
              name={"title"}
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
                  <FormItem className="w-full">
                    <FormLabel>Select a Property</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="House, Condo, Apartment or Land.."/>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="house">House</SelectItem>
                        <SelectItem value="condo">Condo</SelectItem>
                        <SelectItem value="apartment">Apartment</SelectItem>
                        <SelectItem value="land">Land</SelectItem>
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
                  <FormItem className="w-full">
                    <FormLabel>Select a type of Property</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Buy/Rent"/>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="rent">Rent</SelectItem>
                        <SelectItem value="buy">Buy</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Select if for Rent or for Sale
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
                <FormItem className="">
                  <FormLabel>Square Feet</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col gap-2 ">
              <Label className="text-[1rem]">Location - Map</Label>
              <div className="flex gap-4">
                <FormField
                  control={form.control}
                  name="longitude"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Longitude</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
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
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div>
              <FormLabel>What does your Property Offer?</FormLabel>
              <FormDescription>
                What makes this property a good choice.
              </FormDescription>
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
                  name="postDetails.wifi"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-end space-x-3">
                      <FormLabel>Wifi</FormLabel>
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
                  name="postDetails.swimmingPool"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-end space-x-3">
                      <FormLabel>Pool</FormLabel>
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
                      <FormLabel>Gym</FormLabel>
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
                      <FormLabel>Pet-friendly</FormLabel>
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

            <div>
              <FormLabel>Property Description</FormLabel>
              <ReactQuill
                theme="snow"
                value={description}
                onChange={setDescription}
              />
            </div>

            <Button type="submit" className="ml-auto mt-10">
              {isLoading && <Loader2 className="animate-spin" />}
              {isLoading ? "Submitting" : "Submit"}
            </Button>
          </form>
        </Form>

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
      </CardContent>
    </Card>
  );
}

export default AddProperty;
