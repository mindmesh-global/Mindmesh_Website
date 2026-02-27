import { redirect } from 'next/navigation';

export default function DownloadPage() {
  redirect('/?open=download');
}
