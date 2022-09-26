import { NextPage } from 'next';
import Navbar from './components/Navbar';

const about: NextPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center bg-zinc-900 text-gray-50 ">
      <Navbar />
      <div className="w-3/4 flex flex-col items-center mt-20">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita quod
        sapiente et provident dolores! Quisquam tenetur dicta, laboriosam
        distinctio, vitae libero expedita aspernatur dolorum eveniet sapiente
        dolore! Quisquam, minus labore.
      </div>
    </div>
  );
};

export default about;
