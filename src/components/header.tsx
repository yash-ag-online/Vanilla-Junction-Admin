import { BadgeCheckIcon, Box, LogOutIcon, User, Users, Users2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from './ui/button';
import { Link } from 'react-router';

interface AccountDropDownProps {
  avatarUrl: string;
  avatarUrlAtl: string;
  avatarFallback: string | React.ReactElement;
}

const AccountDropDown = ({
  avatarUrl = 'https://github.com/shadcn.png',
  avatarUrlAtl = 'shadcn',
  avatarFallback = <User />,
}: Partial<AccountDropDownProps>) => (
  <>
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="ghost" size="icon" className="flex items-center justify-center overflow-hidden">
            <Avatar className={'rounded-sm'}>
              <AvatarImage src={avatarUrl} alt={avatarUrlAtl} className={'rounded-sm'} />
              <AvatarFallback className={'rounded-sm'}>{avatarFallback}</AvatarFallback>
            </Avatar>
          </Button>
        }
      />
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <Link to={'/me'} className="block">
            <DropdownMenuItem>
              <BadgeCheckIcon />
              Account
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <Link to={'/sign-out'} className="block">
          <DropdownMenuItem>
            <LogOutIcon />
            Sign Out
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  </>
);

const menus: { content: React.ReactNode }[] = [
  {
    content: (
      <Link to={'/customers'}>
        <Button>
          <Users /> <span className="hidden sm:inline">Customers</span>
        </Button>
      </Link>
    ),
  },
  {
    content: (
      <Link to={'/users'}>
        <Button>
          <Users2 /> <span className="hidden sm:inline">Users</span>
        </Button>
      </Link>
    ),
  },
  {
    content: (
      <Link to={'/orders'}>
        <Button>
          <Box /> <span className="hidden sm:inline">Orders</span>
        </Button>
      </Link>
    ),
  },
];

const Header = () => {
  return (
    <header className="h-12 flex items-center justify-between border-b bg-background">
      <div>
        <Link to={'/'} className="flex items-center gap-2">
          <img src="/logo.png" alt="logo" className="size-8" />{' '}
          <span className="hidden sm:inline">Vanilla Junction</span>
        </Link>
      </div>
      <nav>
        <ul className="flex gap-4 justify-end items-center">
          {menus.map((item, idx) => (
            <li key={`nav-manu-${idx}`}>{item.content}</li>
          ))}
          <li>
            <AccountDropDown />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
