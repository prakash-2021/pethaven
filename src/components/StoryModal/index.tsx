import { FileInput } from "@mantine/core";
import "@mantine/core/styles.css";
import { RichTextEditor } from "@mantine/tiptap";
import "@mantine/tiptap/styles.css";
import Underline from "@tiptap/extension-underline";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import confetti from "canvas-confetti";
import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";

import { BiX } from "react-icons/bi";
import { twMerge } from "tailwind-merge";
import { useGetProfile } from "../../pages/Signup/queries";
import { useLocalStorageState } from "../../utils/use-localstorage";
import { Button } from "../Button";
import { TextInput } from "../Input";
import { SelectInput } from "../Select";
import styles from "./index.module.scss";
import { useCreateStory, useUploadImage } from "./queries";

export const StoryModal = ({
  isModalOpen,
  handleClose: handleCloseAll,
}: {
  isModalOpen: boolean;
  handleClose: () => void;
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const token = useLocalStorageState("token");

  const { data: userData } = useGetProfile(token || "");

  const [form, setForm] = useState({
    title: "",
    shortDescription: "",
    category: "Inspiration",
  });

  const editor = useEditor({
    extensions: [StarterKit, Underline],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const { mutate, isSuccess, reset, isPending } = useCreateStory();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const [imageFile, setImageFile] = useState<File | null>(null);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.title.trim()) newErrors.title = "Title is required";
    if (!form.shortDescription.trim())
      newErrors.shortDescription = "Short description is required";
    if (!imageFile) newErrors.thumbnail = "Thumbnail is required";
    if (!form.category.trim()) newErrors.category = "Category is required";
    if (!editor?.getHTML().trim()) newErrors.content = "Content is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const {
    mutateAsync: uploadImage,
    data,
    isSuccess: isSuccessImage,
    isPending: isPendingImage,
  } = useUploadImage();

  const handleSubmit = async () => {
    if (!validate()) return;

    if (imageFile) {
      const formData = new FormData();
      formData.append("image", imageFile);
      uploadImage(formData);
    }
  };

  useEffect(() => {
    if (isSuccessImage) {
      mutate({
        userId: userData?.user.userId || "",
        thumbnail: data.secure_url || "",
        content: editor?.getHTML() || "",
        ...form,
      });
    }
  }, [isSuccessImage]);

  const handleClose = () => {
    handleCloseAll();
    reset();
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (isModalOpen) {
        gsap
          .timeline()
          .to("body", { overflow: "hidden", duration: 0 })
          .to(modalRef.current, { autoAlpha: 1, duration: 0.25 }, "<");
      } else {
        gsap
          .timeline()
          .to("body", { overflow: "unset", duration: 0 })
          .to(modalRef.current, { autoAlpha: 0, duration: 0.25 }, "<");
      }
    });
    return () => ctx.revert();
  }, [isModalOpen]);

  useEffect(() => {
    if (isSuccess) {
      const duration = 2 * 1000;
      const animationEnd = Date.now() + duration;
      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) {
          clearInterval(interval);
          return;
        }
        confetti({
          particleCount: 50,
          startVelocity: 30,
          spread: 360,
          ticks: 60,
          origin: {
            x: Math.random(),
            y: Math.random() - 0.2,
          },
        });
      }, 250);
    }
  }, [isSuccess]);

  return (
    <div className={styles.modal} ref={modalRef} data-lenis-prevent>
      <div className={styles.modalHeader}>
        <div className="w-full mx-4 lg:mx-12">
          <div className="flex items-center justify-between w-full">
            <button
              className="flex items-center justify-center border rounded-full border-black cursor-pointer"
              onClick={handleClose}
            >
              <BiX color="black" size={24} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center w-full">
        {isSuccess ? (
          <div className="ph-container w-full mt-20">
            <h2 className="ph-heading--three mb-2 text-center">
              Your story has been submitted 🙂
            </h2>
            <p className="text-center mb-8">
              Your story is under review and will be published shortly by the
              admin.
            </p>
            <Button
              label="Go back"
              size="small"
              variant="primary"
              onClick={handleClose}
              classNames="mx-auto"
            />
          </div>
        ) : (
          <div className="ph-container w-full mb-12 mt-5 overflow-auto">
            <h2 className="ph-heading--three mb-8 text-center">
              Share Your Story 🐶
            </h2>
            <div className="grid grid-cols-1 gap-6 max-w-2xl mx-auto w-full mb-12">
              <TextInput
                name="title"
                placeholder="Title of your story"
                type="text"
                label="Story Title *"
                value={form.title}
                onChange={handleChange}
                error={errors.title}
              />
              <TextInput
                name="shortDescription"
                placeholder="Short description"
                type="text"
                label="Short Description *"
                value={form.shortDescription}
                onChange={handleChange}
                error={errors.shortDescription}
              />
              <FileInput
                label="Upload Image"
                accept="image/*"
                value={imageFile}
                onChange={setImageFile}
                placeholder="Choose images"
              />
              {errors.thumbnail && (
                <p className="text-red-500 text-sm">{errors.thumbnail}</p>
              )}
              <SelectInput
                name="category"
                label="Category *"
                options={[
                  { label: "Inspiration", value: "Inspiration" },
                  { label: "Lost", value: "Lost" },
                ]}
                value={form.category}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, category: e.target.value }))
                }
                error={errors.category}
              />
              <div>
                <label className="block mb-2 font-medium">Content *</label>
                <RichTextEditor editor={editor}>
                  <RichTextEditor.Toolbar>
                    <RichTextEditor.ControlsGroup>
                      <RichTextEditor.Bold />
                      <RichTextEditor.Italic />
                      <RichTextEditor.Underline />
                      <RichTextEditor.Strikethrough />
                      <RichTextEditor.Code />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                      <RichTextEditor.H1 />
                      <RichTextEditor.H2 />
                      <RichTextEditor.H3 />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                      <RichTextEditor.Undo />
                      <RichTextEditor.Redo />
                    </RichTextEditor.ControlsGroup>
                  </RichTextEditor.Toolbar>

                  <RichTextEditor.Content className="min-h-[200px] p-4" />
                </RichTextEditor>
                {errors.content && (
                  <p className="text-red-500 text-sm">{errors.content}</p>
                )}
              </div>
              <Button
                label={
                  isPending || isPendingImage ? "Submitting" : "Submit Story"
                }
                classNames={twMerge(
                  isPending || isPendingImage ? "pointer-events-none" : ""
                )}
                onClick={handleSubmit}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
