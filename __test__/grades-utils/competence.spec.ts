import {
  CompetenceGradeExtension,
  averageCompetence,
  competenceToNumber,
  evaluateCompetence,
} from "@/features/evaluation/application/adapters/utils/competence-case";
import {
  CompetenceEvaluationType,
  EvaluationCriteriaType,
} from "@/features/evaluation/domain/entities/evaluation-schema";
import { Grade } from "@/features/evaluation/domain/entities/evaluation-with-grades-schema";
import { describe, it, expect } from "vitest";
import { gradeType } from "../../convex/fields/grade_type";

describe("competenceToNumber", () => {
  it("converts competence levels to the correct numbers", () => {
    expect(competenceToNumber("Expertise")).toBe(3);
    expect(competenceToNumber("Proficiency")).toBe(2);
    expect(competenceToNumber("To be developed")).toBe(1);
    expect(competenceToNumber("To be acquired")).toBe(0);
  });
});

describe("averageCompetence", () => {
  it("calculates the average competence level correctly", () => {
    expect(averageCompetence([3, 2, 1, 0])).toBe("Proficiency");
    expect(averageCompetence([3, 3, 3])).toBe("Expertise");
    expect(averageCompetence([1, 1, 0])).toBe("To be developed");
    expect(averageCompetence([0, 0, 0])).toBe("To be acquired");
  });

  it("handles empty grade array by returning the lowest level", () => {
    expect(averageCompetence([])).toBe("To be acquired");
  });
});

describe("evaluateCompetence", () => {
  const criteria: EvaluationCriteriaType[] = [
    {
      id: "criteria1",
      weight: 1,
      createdBy: "user1",
      description: "description",
      name: "criteria1",
      isGraded: true,
      gradeType: {
        grade: "Expertise",
        name: "Competence-Based Evaluation",
        type: "Competence",
      },
    },
  ];
  it("evaluates competence correctly based on grades and criteria", () => {
    const grades: Grade[] = [
      {
        criteriaId: "criteria1",
        grade: "Expertise",
        gradeType: {
          grade: "Expertise",
          name: "Competence-Based Evaluation",
          type: "Competence",
        },
      },
      {
        criteriaId: "criteria1",
        grade: "Proficiency",
        gradeType: {
          grade: "Proficiency",
          name: "Competence-Based Evaluation",
          type: "Competence",
        },
      },
    ];

    expect(evaluateCompetence(grades, criteria)).toBe("Expertise");
  });

  it("returns special grade type when applicable", () => {
    const grades: CompetenceGradeExtension[] = [
      {
        criteriaId: "criteria1",
        grade: "N/D",
        gradeType: {
          grade: "Proficiency",
          name: "Competence-Based Evaluation",
          type: "Competence",
        },
      },
    ];
    const result = evaluateCompetence(grades, criteria);
    console.log("result", result);
    // Mock `checkSpecialGradeType` to return a special type
    expect(result).toBe("N/D"); // Adjust based on actual logic
  });
});
