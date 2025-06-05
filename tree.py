import os

BLACKLIST = {
    '.git',
    '__pycache__',
    '.DS_Store',
    'node_modules',
    '.venv',
    '.idea',
    '.vscode',
    'dist',
    'build',
    '.mypy_cache',
    '.pytest_cache',
    '*.log',
    'tree.py'
}

from fnmatch import fnmatch


def is_ignored(name):
    return any(fnmatch(name, pattern) for pattern in BLACKLIST)


def print_tree(start_path='.', prefix=''):
    try:
        entries = sorted(os.listdir(start_path))
    except PermissionError:
        return

    entries = [e for e in entries if not is_ignored(e)]
    pointers = ['├──'] * (len(entries) - 1) + ['└──']

    for pointer, entry in zip(pointers, entries):
        path = os.path.join(start_path, entry)
        print(prefix + pointer + ' ' + entry)
        if os.path.isdir(path):
            extension = '│   ' if pointer == '├──' else '    '
            print_tree(path, prefix + extension)


if __name__ == '__main__':
    project_root = os.path.basename(os.path.abspath('.'))
    print(project_root)
    print_tree('.')
