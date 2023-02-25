interface MenuProps {
    children: ReactComponentElement<MenuItem>;
}

interface MenuItem {
    color?: string;
    disabled?: boolean;
    icon: SvgIconComponent;
    label: string;
    link?: string;
    onClick?(item: MenuItem): void;
}