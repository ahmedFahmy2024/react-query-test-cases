import { useInView } from "react-intersection-observer";

interface InfinteScrollContainerProps {
  children: React.ReactNode;
  onBottomReached: () => void;
  className?: string;
}

const InfinteScrollContainer = ({
  children,
  onBottomReached,
  className,
}: InfinteScrollContainerProps) => {
  const { ref } = useInView({
    rootMargin: "50px",
    onChange: (inView) => {
      if (inView) {
        onBottomReached();
      }
    },
  });

  return (
    <div className={className}>
      {children}
      <div ref={ref} />
    </div>
  );
};

export default InfinteScrollContainer;

// rootMargin: "50px" => the element will be triggered when it is 50px from the bottom of the viewport

// onChange: (inView) => {
//   if (inView) {
//     onBottomReached();
//   }
// },

// onBottomReached: () => void => this function will be called when the element is triggered

// ref={ref} => this is the element that will be triggered
