"use client";

import { FC, useEffect } from "react";
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, DragEndEvent } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, useSortable, arrayMove } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import FieldRow from "./FieldRow";
import { useSchemaStore } from "@/store/schemaStore";
import { v4 as uuid } from "uuid";
import { Field } from "@/types/Fields";

const SortableItem: FC<{ field: Field }> = ({ field }) => {
    const updateField = useSchemaStore((s) => s.updateField);
    const deleteField = useSchemaStore((s) => s.deleteField);

    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: field.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} style={style}>
            <FieldRow
                field={field}
                onUpdate={(f) => updateField(f.id, f)}
                onDelete={deleteField}
                dragHandleProps={listeners}
            />
        </div>
    );
};

const FieldTable: FC = () => {
    const fields = useSchemaStore((s) => s.fields);
    const addField = useSchemaStore((s) => s.addField);
    const setFields = useSchemaStore((s) => s.setFields);

    const sensors = useSensors(useSensor(PointerSensor));

    useEffect(() => {
        if (fields.length === 0) {
            const defaultFields: Field[] = [
                { id: uuid(), name: "First Name", type: "First Name", blankPercent: 0, sum: false },
                { id: uuid(), name: "Last Name", type: "Last Name", blankPercent: 0, sum: false },
            ];
            defaultFields.forEach((f) => addField(f));
        }
    }, []);

    const handleAdd = () => {
        const defaultType: Field["type"] = "First Name";
        addField({ id: uuid(), name: defaultType, type: defaultType, blankPercent: 0, sum: false });
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (active.id !== over?.id) {
            const oldIndex = fields.findIndex((f) => f.id === active.id);
            const newIndex = fields.findIndex((f) => f.id === over?.id);
            setFields(arrayMove(fields, oldIndex, newIndex));
        }
    };

    return (
        <div className="flex flex-col gap-3">
            {/* Header */}
            <div className="ml-20 mb-2 flex gap-4 font-bold text-cyan-300 tracking-wide select-none">
                <span className="w-12"></span> {/* для drag handle */}
                <span className="w-40">Field Name</span>
                <span className="w-40">Field Type</span>
                <span className="w-20">Blank %</span>
            </div>

            {/* DnD Context */}
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={fields.map((f) => f.id)} strategy={verticalListSortingStrategy}>
                    {fields.map((field) => (
                        <SortableItem key={field.id} field={field} />
                    ))}
                </SortableContext>
            </DndContext>

            {/* Add button */}
            <button
                onClick={handleAdd}
                className="mt-3 ml-10 w-[540px] py-2 rounded-xl bg-cyan-600 text-white
                   font-bold tracking-wide
                   hover:bg-cyan-500 hover:shadow-[0_0_12px_cyan]
                   transition"
            >
                + Add Another Field
            </button>
        </div>
    );
};

export default FieldTable;
