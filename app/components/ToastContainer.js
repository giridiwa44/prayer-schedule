export default function ToastContainer({ toasts, removeToast }) {
  const typeStyles = {
    success: 'bg-green-500 border-green-600',
    warning: 'bg-yellow-500 border-yellow-600',
    info: 'bg-blue-500 border-blue-600',
    prayer: 'bg-islamic-600 border-islamic-700',
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`${typeStyles[toast.type]} text-white px-6 py-4 rounded-lg shadow-lg border-l-4 animate-slide-in-right max-w-sm`}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="font-bold text-sm mb-1">{toast.title}</div>
              <div className="text-sm opacity-90">{toast.message}</div>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="ml-4 text-white hover:text-gray-200 font-bold text-lg leading-none"
            >
              ×
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
