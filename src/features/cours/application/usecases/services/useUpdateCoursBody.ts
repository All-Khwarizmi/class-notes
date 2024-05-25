import { useEffect, useState } from "react";
import { toast } from "sonner";
import {coursUsecases} from "../cours-usecases";
import { isLeft } from "fp-ts/lib/Either";

export default function useUpdateCoursBody() {

    const [updateCoursBodyOptions, setUpdateCoursBodyOptions] = useState<
    {
        userId: string;
        coursId: string;
        body: string;
    } | null>(null);

    useEffect(() => {
        if (!updateCoursBodyOptions) return;
        const loadingToast = toast.loading("Updating cours body...", {
            position: "top-center",
        });
        coursUsecases.updateCourseBody(updateCoursBodyOptions).then((eitherCours) => {
            if (isLeft(eitherCours)) {
                toast.error("Failed to update cours body", {
                    position: "top-center",
                    description: eitherCours.left.message,
                });
                return;
            }
            toast.success("Cours body updated successfully", {
                position: "top-center",
                duration: 3000,
            });
        }
        ).finally(() => {
            setUpdateCoursBodyOptions(null);
            toast.dismiss(loadingToast);
        }
        );
    }, [updateCoursBodyOptions]);


    return { setUpdateCoursBodyOptions }
}