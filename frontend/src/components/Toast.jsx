import { Toaster, toast } from 'sonner';

const CustomToastContainer = ({ ...props }) => (
  <Toaster
    richColors
    expand={false}
    {...props}
    position="top-right"
    className="text-[14px]"
  />
);

export default CustomToastContainer;
