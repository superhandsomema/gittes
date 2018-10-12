# GIT命令行
## git branch 
###一般用于分支的操作，比如创建分支，查看分支等等
----  

* __git branch__
    > 不带参数:列出本地已经存在的分支,并且在当前分支的前面用"*"标记

* __git branch -r__
    > 查看远程版本库分支列表

* __git branch -a__
    > 查看所有分支列表，包括本地和远程

* __git branch dev__
    > 创建名为dev的分支，创建分支时需要是最新的环境，创建分支但依然停留在当前分支

* __git branch -d dev__
    > 删除dev分支，如果在分支中有一些未merge的提交，那么会删除分支失败，此时可以使用 git branch -D dev：强制删除dev分支

* __git branch -vv__
    > 可以查看本地分支对应的远程分支

* __git branch -m oldName newName__
    > 给分支重命名

## git checkout
__操作文件__
* __git checkout filename__
    >放弃单个文件的修改
* __git checkout .__
    >放弃当前目录下的修改

__操作分支__
* __git checkout master__
    >将分支切换到master
* __git checkout -b master__
    >如果分支存在则只切换分支，若不存在则创建并切换到master分支，repo start是对git checkout -b这个命令的封装，将所有仓库的分支都切换到master，master是分支名.
    
__查看帮助__
* __git checkout --help__