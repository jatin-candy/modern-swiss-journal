interface SectionTitleProps {
  title: string;
  withLine?: boolean;
}
const SectionTitle = ({
  title,
  withLine = false
}: SectionTitleProps) => {
  return <div className={`mb-6 ${withLine ? 'border-b border-gray-200 pb-2' : ''}`}>
      <h2 className="font-sans uppercase tracking-wider font-normal text-base text-left">
        {title}
      </h2>
    </div>;
};
export default SectionTitle;