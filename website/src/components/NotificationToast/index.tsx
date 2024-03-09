import { CheckCircleIcon, XMarkIcon } from "@heroicons/react/20/solid";
import classNames from "classnames";
import toast, { Toast } from "react-hot-toast";

type Props = {
  t: Toast;
  title: string;
  description?: string;
};

export default function NotificationToast(props: Props) {
  const { t, title, description } = props;
  return (
    <div
      className={classNames(
        "bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5  w-full max-w-sm overflow-hidden",
        `${t.visible ? "animate-enter" : "animate-leave"}`
      )}
    >
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <CheckCircleIcon
              className="h-6 w-6 text-green-400"
              aria-hidden="true"
            />
          </div>
          <div className="ml-3 w-0 flex-1 pt-0.5">
            <p className="text-sm font-medium text-gray-900">{title}</p>
            <p className="mt-1 text-sm text-gray-500">{description}</p>
          </div>
          <div className="ml-4 flex flex-shrink-0">
            <button
              type="button"
              className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={() => toast.dismiss(t.id)}
            >
              <span className="sr-only">Close</span>
              <XMarkIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
