import {
  SelectGroup,
  SelectItem,
  SelectLabel,
} from "@/core/components/ui/select";
import React from "react";

function GradeTypeSelectGroup() {
  return (
    <SelectGroup>
      <SelectLabel>Numeric</SelectLabel>
      <SelectItem value="10-point Scale">10-point Scale</SelectItem>
      <SelectItem value="20-point Scale">20-point Scale</SelectItem>
      <SelectLabel>Descriptive Grades</SelectLabel>
      <SelectItem value="Competence-Based Evaluation">
        Competency-Based Grading
      </SelectItem>

      {/* 
      <SelectItem value="Numeric">Numeric</SelectItem>
      <SelectItem value="Percentage">Percentage</SelectItem>
      <SelectItem value="A/B/C/D/F">US Letter Grades</SelectItem>
      <SelectItem value="A/B/C/D/F/Pass/Fail">
        US Letter Grades with Pass/Fail
      </SelectItem>
      <SelectItem value="A/B/C/D/F/Pass/Fail/None">
        US Letter Grades with Pass/Fail/None
      </SelectItem>
      <SelectItem value="Pass/Fail">Pass/Fail</SelectItem>
    
      <SelectItem value="4.0 Scale">US 4.0 Scale</SelectItem>
      <SelectItem value="First/Upper Second/Lower Second/Third">
        UK Honors
      </SelectItem>
     
      <SelectItem value="Grade Points">Grade Points</SelectItem>
      <SelectItem value="Other">Custom</SelectItem>
      <SelectLabel>Sports</SelectLabel>
      <SelectItem value="Points">Sport Points</SelectItem>
      <SelectItem value="Ranking">Sport Ranking</SelectItem>
      <SelectItem value="Win/Loss/Tie">Sport Result</SelectItem>
      <SelectItem value="Performance Level">Sport Performance</SelectItem>
      <SelectLabel>International</SelectLabel>
      <SelectItem value="French Grading">French Grading</SelectItem>
      <SelectItem value="German Grading">German Grading</SelectItem>
      <SelectItem value="Australian Grading">Australian Grading</SelectItem>
      <SelectItem value="Spanish Grading">Spanish Grading</SelectItem> */}
    </SelectGroup>
  );
}

export default GradeTypeSelectGroup;
