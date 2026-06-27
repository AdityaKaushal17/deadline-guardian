from backend.schemas.tasks import SubtaskOut, TaskUnderstanding


class TaskDecomposerAgent:
    def decompose(self, task: TaskUnderstanding) -> list[SubtaskOut]:
        name = task.task_name.lower()
        if "recommendation" in name or "system" in name:
            titles = [
                ("Collect dataset", 60, None),
                ("Clean dataset", 90, "Collect dataset"),
                ("Perform EDA", 75, "Clean dataset"),
                ("Build user-item matrix", 120, "Perform EDA"),
                ("Matrix factorization", 180, "Build user-item matrix"),
                ("Evaluation", 60, "Matrix factorization"),
                ("Build dashboard", 120, "Evaluation"),
                ("Documentation", 75, "Build dashboard"),
            ]
        elif "assignment" in name or task.category == "Assignment":
            titles = [
                ("Clarify requirements", 25, None),
                ("Research and outline", 45, "Clarify requirements"),
                ("Core implementation", 120, "Research and outline"),
                ("Review outputs", 45, "Core implementation"),
                ("Submit final work", 25, "Review outputs"),
            ]
        else:
            titles = [
                ("Define outcome", 25, None),
                ("First focused work block", 50, "Define outcome"),
                ("Second focused work block", 50, "First focused work block"),
                ("Review and close", 30, "Second focused work block"),
            ]
        return [
            SubtaskOut(
                title=title,
                estimated_minutes=minutes,
                dependency=dependency,
                priority="Critical" if index == 0 and task.priority == "Critical" else "High",
                progress=0,
            )
            for index, (title, minutes, dependency) in enumerate(titles)
        ]
