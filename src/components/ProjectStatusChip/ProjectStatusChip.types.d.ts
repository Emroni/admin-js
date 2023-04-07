type ProjectStatusChip = 'billed' | 'complete' | 'in_progress' | 'on_hold';

interface ProjectStatusChipProps {
    value?: ProjectStatusChip;
}