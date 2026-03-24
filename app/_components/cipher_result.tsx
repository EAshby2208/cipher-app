// app/_components/cipher_result.tsx

export default function CipherResult({
  result,
  keyword,
  code
}: {
  result: string;
  keyword: string[];
  code: string;
}) {
  if (!result) return null;

  return (
    <div className="space-y-3">
      {/* <div className="text-sm text-zinc-500">
        <strong>Key:</strong> {keyword.join(" ")}
      </div>
      <div className="text-sm text-zinc-500">
        <strong>Code:</strong> {code}
      </div> */}

      <div className="p-4 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
        <strong>Result:</strong> {result}
      </div>
    </div>
  );
}
