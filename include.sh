function log {
	echo "################ [`date`] $1 ###############"
	echo "################ [`date`] $1 ###############" >&2
}

function git-branch {
	echo $(git branch --no-color 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/\1/')
}
