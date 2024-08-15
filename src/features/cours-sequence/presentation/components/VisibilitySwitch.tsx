// import { Switch } from "@/core/components/ui/switch";
// import useGetVisibility from "@/features/classe/application/adapters/services/useGetVisibility";
// import useUpdateVisibility from "@/features/classe/application/adapters/services/useUpdateVisibility";
// import { isLeft } from "fp-ts/lib/Either";
// import { Ban, Loader } from "lucide-react";
// import React from "react";

// function VisibilitySwitch(props: {
//   userId: string;
//   type: "classe" | "sequence" | "cours" | "complement";
//   typeId: string;
// }) {
//   const { data: eitherVisibility, isPending } = useGetVisibility({
//     userId: props.userId,
//   });
//   const { mutate: updateVisibility, isPending: isPendingUpdate } =
//     useUpdateVisibility();
//   if (isPending || isPendingUpdate) {
//     return <Loader size={16} />;
//   }
//   if (eitherVisibility) {
//     if (isLeft(eitherVisibility)) {
//       return <Ban size={16} />;
//     } else {
//       const isVisible = eitherVisibility.right[
//         props.type === "sequence"
//           ? "sequences"
//           : props.type === "cours"
//           ? "cours"
//           : props.type === "classe"
//           ? "classe"
//           : props.type === "complement"
//           ? "complement"
//           : "classe"
//       ].find((v) => v.id === props.typeId)?.publish;
//       return (
//         <div className="text-white">
//           <Switch
//             style={
//               isVisible
//                 ? { backgroundColor: "#10B981" }
//                 : {
//                     backgroundColor: "#EF4444",
//                   }
//             }
//             color="white"
//             className="h-4 w-8 bg-white  rounded-full"
//             checked={isVisible ?? false}
//             onCheckedChange={(checked) => {
//               updateVisibility({
//                 userId: props.userId,
//                 type: props.type,
//                 typeId: props.typeId,
//                 publish: checked,
//               });
//             }}
//           />
//         </div>
//       );
//     }
//   }
// }

// export default VisibilitySwitch;
