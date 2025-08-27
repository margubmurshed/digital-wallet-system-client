import type { ReactNode } from "react";

export default function ShimmerButton({ children }: { children: ReactNode }) {
    const customCss = `
    /* This is the key to the seamless animation.
      The @property rule tells the browser that '--angle' is a custom property
      of type <angle>. This allows the browser to smoothly interpolate it
      during animations, preventing the "jump" at the end of the loop.
    */
    @property --angle {
      syntax: '<angle>';
      initial-value: 0deg;
      inherits: false;
    }

    /* The keyframe animation simply transitions the --angle property
      from its start (0deg) to its end (360deg).
    */
    @keyframes shimmer-spin {
      to {
        --angle: 360deg;
      }
    }
  `;

    return (
        // Main container to center the button on the page
        <div className="flex items-center justify-center font-sans">
            <style>{customCss}</style>
            <button className="relative inline-flex items-center justify-center p-[1.5px] bg-gray-300 dark:bg-black rounded-lg overflow-hidden group">
                <div
                    className="absolute inset-0"
                    style={{
                        background: 'conic-gradient(from var(--angle), transparent 25%, #1d75d7, transparent 50%)',
                        animation: 'shimmer-spin 2.5s linear infinite',
                    }}
                />
                <span className="relative z-10 inline-flex items-center justify-center w-full h-full px-4 py-2 text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-900 rounded-lg group-hover:bg-gray-100 dark:group-hover:bg-gray-800 transition-colors duration-300">
                    {children}
                </span>
            </button>
        </div>
    );
}
