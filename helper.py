'''
This is the helper script for QTRIPDYNAMIC
It can:
1. Update the Module Id in metadata.json and push it to the git repo

Invocation:
> python3 helper.py --update <next_module_name>
'''

import argparse
import fileinput
import re
import git
from git import Repo

def update_metadata(next_module_name):
    print('Updating metadata.json with module name: ', next_module_name)
    new_name = 'ME_QTRIPDYNAMIC_MODULE_'+next_module_name
    for line in fileinput.input(files ='__CRIO__/metadata.json', inplace=1):
        line = re.sub(r'ME_QTRIPDYNAMIC_MODULE_[A-Z,_]+',new_name, line.rstrip())
        print(line)
    print('Done')

def push_to_repo(next_module_name):
    print('Pushing files to git repo')
    repo = git.Repo('.')
    repo.index.add(['__CRIO__/metadata.json'])
    repo.index.commit('Update module name to '+next_module_name)
    repo.remotes.origin.push()
    print('Done')

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('-u', '--update', help='Update the module name in metadata.json')

    args = parser.parse_args()

    if args.update:
        update_metadata(args.update)
        push_to_repo(args.update)

