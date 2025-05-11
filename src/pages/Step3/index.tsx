import { useFileStore, useStepActions, useUserStore } from "@/stores";
import { useEffect, useState } from "react";
import SuccessPopup from "./SuccessPopup";

const Step3 = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userData = useUserStore();
  const fileDate = useFileStore();
  const { setBeforeNext } = useStepActions();

  useEffect(() => {
    setBeforeNext(async () => {
      setIsModalOpen(true);
    });
  }, [setBeforeNext]);

  return (
    <div className="mb-10 flex w-full flex-col gap-6 overflow-auto p-4">
      <Section title="Basic Info">
        <ListItem label="Name" value={userData.name} />
        <ListItem label="Email" value={userData.email} />
        <ListItem label="Phone" value={userData.phone} />
        <ListItem label="Nationality" value={userData.nationality} />
        <ListItem label="Gender" value={userData.gender} />
        <ListItem label="Address" value={userData.address} />
        <ListItem
          label="Birthdate"
          value={new Date(userData.birthdate).toLocaleDateString()}
        />
      </Section>

      <Section title="Documents">
        <ListItem
          label="ID Card Front"
          value={formatFile(fileDate.idCardFront)}
        />
        <ListItem
          label="ID Card Back"
          value={formatFile(fileDate.idCardBack)}
        />
        <ListItem
          label="Additional"
          value={fileDate.extraDocs.map(formatFile)}
        />
      </Section>
      <SuccessPopup
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Step3;

const formatFile = (file: File) => {
  return `${file.name} - ${(file.size / 1024).toFixed(2)} KB`;
};

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="border-muted w-full rounded-xl border bg-white p-4 shadow-sm">
    <h3 className="mb-3 text-lg font-semibold text-gray-800">{title}</h3>
    <div className="flex flex-col gap-3">{children}</div>
  </div>
);

const ListItem = <T extends string | number | null | string[]>({
  label,
  value,
}: {
  label: string;
  value: T;
}) => {
  return (
    <div className="flex flex-col gap-2 text-sm md:flex-row">
      <div className="text-primary w-32 font-bold">{label}:</div>
      <div className="flex-1">
        {Array.isArray(value) ? (
          <ul className="flex flex-wrap gap-1 text-gray-800">
            {value.map((v, i) => (
              <li key={i} className="rounded bg-gray-100 px-2 py-0.5">
                {v}
              </li>
            ))}
          </ul>
        ) : (
          <span className="ml-2 text-gray-800 md:ml-0">{value}</span>
        )}
      </div>
    </div>
  );
};
