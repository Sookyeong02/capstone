interface FileUploadItemProps {
  id: string;
  value?: File;
  onChange: (file: File | undefined) => void;
  error?: boolean;
  errorMessage?: string;
}

export default function FileUploadItem({
  id,
  value,
  onChange,
  error,
  errorMessage,
}: FileUploadItemProps) {
  return (
    <div className="flex w-[350px] flex-col gap-[8px] md:w-[640px]">
      <label
        htmlFor={id}
        className="cursor-pointer rounded-md border border-gray-300 px-4 py-3 text-gray-700 hover:bg-gray-50"
      >
        {value ? value.name : '사업자 등록증 업로드'}
      </label>
      <input
        id={id}
        name="file"
        type="file"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          onChange(file);
        }}
      />
      <p className="font-regular text-lg text-gray-300">
        ※ 승인 완료 전에는 로그인 및 기능 사용이 제한됩니다.
      </p>
      {error && errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
    </div>
  );
}
