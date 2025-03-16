
interface SectionTitleProps {
  title: string;
  withLine?: boolean;
}

const SectionTitle = ({ title, withLine = false }: SectionTitleProps) => {
  return (
    <div className={`mb-6 ${withLine ? 'border-b border-gray-200 pb-2' : ''}`}>
      <h2 className="font-sans text-base font-bold uppercase tracking-wider">
        {title}
      </h2>
    </div>
  );
};

export default SectionTitle;
