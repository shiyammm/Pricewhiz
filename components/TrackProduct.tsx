'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormEvent, useState } from 'react';
import { addUserEmail } from '@/lib/action';

type Props = {
  productId: string;
};

export function TrackProduct({ productId }: Props) {
  const [email, setEmail] = useState('');
  const [isTracking, setIsTracking] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  const handleEmailSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsTracking(false);
    await addUserEmail(productId, email);
    setEmail('');
    close();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="text-md font-semibold"
          onClick={open}
        >
          Track Product
        </Button>
      </DialogTrigger>
      {isOpen && (
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Enter your Email</DialogTitle>
            <DialogDescription>
              Stay updated with product pricing alerts right in your inbox!{' '}
            </DialogDescription>
          </DialogHeader>
          <form
            className="flex items-center space-x-2"
            onSubmit={handleEmailSubmit}
          >
            <div className="grid flex-1 gap-2">
              <Label htmlFor="link" className="sr-only">
                Email
              </Label>
              <Input
                id="link"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <Button type="submit" size="sm" className="px-3">
              {isTracking ? 'Tracking' : 'Track'}
            </Button>
          </form>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      )}
    </Dialog>
  );
}
